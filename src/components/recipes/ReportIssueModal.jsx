"use client";

import React, { useState } from "react";
import { Button, Input, Label, Modal, Surface, TextField, Select, ListBox, toast } from "@heroui/react";
import { FiAlertTriangle } from "react-icons/fi";
import { reportRecipe } from "@/lib/action/reports";

export default function ReportIssueModal({ recipeId, userMail, children }) {
  const [reason, setReason] = useState("Spam");
  const [comments, setComments] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e, close) => {
    e.preventDefault();
    setSubmitting(true);

    const reportData = {
      recipeId,
      userMail,
      reason,
      comments: comments.trim() || null,
    };

    try {
      const res = await reportRecipe(reportData);
      if (res?.insertedId) {
        // Clear fields on success
        toast.success("Thank you. Your report has been submitted successfully.");
        setComments("");
        setReason("Spam");
        // Close modal using HeroUI's context-aware trigger injection or native state dismissal

        close();
      }
    } catch (error) {
      console.error("Failed submitting issue report:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal>
      {/* children holds your original button trigger safely */}
      {children}
      <Modal.Backdrop>
        <Modal.Container placement="auto">
          <Modal.Dialog className="sm:max-w-md">
            {({ close }) => (
              <>
                <Modal.CloseTrigger />
                <Modal.Header>
                  <Modal.Icon className="bg-danger/10 text-danger">
                    <FiAlertTriangle className="size-5" />
                  </Modal.Icon>
                  <Modal.Heading>Report Recipe Issue</Modal.Heading>
                  <p className="mt-1.5 text-sm leading-5 text-default-400">
                    Help us keep RecipeRoom accurate. Let us know what is wrong with this recipe layout or data.
                  </p>
                </Modal.Header>
                <Modal.Body className="p-6">
                  <Surface variant="default">
                    <form onSubmit={(e) => handleSubmit(e, close)} className="flex flex-col gap-4">
                      
                      {/* Reason Select Option field */}
                      <div className="flex flex-col gap-1.5 w-full">
                        <label className="text-sm font-medium text-default-700">Reason for Report</label>
                        <select 
                          value={reason} 
                          onChange={(e) => setReason(e.target.value)}
                          className="w-full bg-default-100 hover:bg-default-200 focus:bg-default-100 border border-divider rounded-xl h-10 px-3 text-sm transition-colors outline-none cursor-pointer"
                          required
                        >
                          <option value="Spam">Spam</option>
                          <option value="Fake Recipe">Fake Recipe</option>
                          <option value="Copyright Issue">Copyright Issue</option>
                          <option value="Inappropriate Content">Inappropriate Content</option>
                        </select>
                      </div>

                      {/* Additional Comment field */}
                      <TextField className="w-full" name="comments" variant="secondary">
                        <Label>Additional comments (Optional)</Label>
                        <Input 
                          placeholder="Provide more specific details..." 
                          value={comments}
                          onChange={(e) => setComments(e.target.value)}
                        />
                      </TextField>

                      {/* Hidden Submit Button mapped to look clean */}
                      <div className="mt-2 flex justify-end gap-3 border-t border-divider pt-4">
                        <Button type="button" onClick={close} variant="secondary">
                          Cancel
                        </Button>
                        <Button type="submit" color="danger" isLoading={submitting}>
                          Submit Report
                        </Button>
                      </div>
                    </form>
                  </Surface>
                </Modal.Body>
              </>
            )}
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}